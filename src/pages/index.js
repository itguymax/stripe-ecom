import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"



class IndexPage extends Component {

componentDidMount(){
  this.stripe = window.Stripe('pk_test_kqbL9UU9JXkadXRYRpneYrkN00cZUEBz7R', {betas:['checkout_beta_4']});
}


  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <form onSubmit={ event => {
          event.preventDefault();
        
          this.stripe
            .redirectToCheckout({
              items: [{ sku: "sku_EwM3R7cyCnd3Ir", quantity: 1 }],

              // Note that it is not guaranteed your customers will be redirected to this
              // URL *100%* of the time, it's possible that they could e.g. close the
              // tab between form submission and the redirect.
              successUrl: "http://localhost:8000/success",
              cancelUrl: "http://localhost:8000/canceled",
            })
            .then(function(result) {
              if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                console.log(result.error.message)
              }
            })
        }}>
          <button type="submit"> Buy it now!!</button>
        </form>
      </Layout>
    )
  }
}


export default IndexPage
