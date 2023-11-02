/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { Layout } from "../../components/Layout";
import clienteAxios from "../../config/axios";

export async function getStaticProps(){

}

export async function getStaticPaths(){
    
}

export default ()=>{
    return(
       <Layout>
            <h1>Desde [enlace].js</h1>
       </Layout> 
    )
}