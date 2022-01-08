import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Header } from '../components/Header';

const Main: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Main</title>
            </Head>
            <Header></Header>
            <main className="text-center text-3xl">
                <h1>Main Page!</h1>
            </main>
        </div>
    );
};

export default Main;
