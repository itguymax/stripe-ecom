import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/Store/ProductsListing"
import ProductsListing from "../components/Store/ProductsListing";


class IndexPage extends Component {


  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <ProductsListing/>
      </Layout>
    )
  }
}


export default IndexPage
