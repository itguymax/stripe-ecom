import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
    <Layout>
        <SEO title="Page two" />
        <h1>You bought something</h1>
        <p>Thanks for your purchase</p>
        
    </Layout>
)

export default SecondPage
