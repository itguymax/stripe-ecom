import React, { Component } from 'react'
import { StaticQuery, graphql} from 'gatsby';
import Layout from '../components/layout'
class Product extends Component {
  
    componentDidMount() {
        this.stripe = window.Stripe('pk_test_kqbL9UU9JXkadXRYRpneYrkN00cZUEBz7R', { betas: ['checkout_beta_4'] });
    }

    handleSubmit = (sku) => {
        return  event => {
            event.preventDefault();
            this.stripe
                .redirectToCheckout({
                    items: [{ sku, quantity: 1 }],

                    // Note that it is not guaranteed your customers will be redirected to this
                    // URL *100%* of the time, it's possible that they could e.g. close the
                    // tab between form submission and the redirect.
                    successUrl: "http://localhost:8000/success",
                    cancelUrl: "http://localhost:8000/canceled",
                })
                .then(function (result) {
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer.
                        console.log(result.error.message)
                    }
                })
        }
    }

  render() {
      const { id, currency, price, name } = this.props;
      const priceFloat = (price/100).toFixed(2);
      const formatedPrice = Intl.NumberFormat('en-US',{style:'currency', currency}).format(priceFloat);
    return (
      <form onSubmit={this.handleSubmit(id)}>
        <h2>{name} ({formatedPrice})</h2>
        <button type="submit">Buy now</button>
      </form>
    )
  }
}


export default () => (
    <StaticQuery
        query={graphql`
            {
                allStripeSku{
                    edges{
                    node{
                        id
                        currency
                        price
                        attributes{
                        name
                        }
                        image
                    }
                    }
                }
            }
        ` }
        render={ data => (
            <Layout>
                {
                    data.allStripeSku.edges.map(({ node: sku })=>{
                        return (
                            <Product
                                key={sku.id}
                                id={sku.id}
                                currency = {sku.currency}
                                price = { sku.price }
                                name = { sku.attributes.name}
                            />
                        )
                    })
                }
            </Layout>
        )}
    
    />
)