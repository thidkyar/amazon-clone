import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home({ products }) {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon 2.0</title>
            </Head>
            <Header />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />
                <ProductFeed products={products} />
                <ToastContainer className="opacity-80"/>
            </main>
        </div>
    );
}

/* tells next js it is no longer a static page. Render page then deliver - otherwise page will show without products*/
export async function getServerSideProps(context) {
    const products = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
    );

    return {
        props: {
            products,
        },
    };
}
