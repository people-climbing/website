'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import styles from './page.module.css'

const PUBLIC_KEY = 'pk_test_51PzVChGRGs9yWeb5ns6QCqnpB7XGBzMuDsnlbGIZi7fM2lVAByv0aDxdz5cOkvhCLm2FB5exuEheqkpy3lr6ZFwW00bLOeGqNT';
const stripePromise = loadStripe(PUBLIC_KEY);

const priceMap = {
    'small': 'price_1PzkWqGRGs9yWeb5ndwpkIfT',
    'medium': 'price_1PzkWqGRGs9yWeb5ndwpkIfT',
    'large': 'price_1PzkWqGRGs9yWeb5ndwpkIfT',
    'xlarge': 'price_1PzkWqGRGs9yWeb5ndwpkIfT'
}

export default function ShirtPage() {
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const checkout = async (e) => {
        if (!size || Number.isNaN(quantity)) return;
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: priceMap[size],
                quantity,
            }],
            mode: 'payment',
            shippingAddressCollection: { allowedCountries: ['US'] },
            successUrl: `${window.location.origin}/thanks`,
            cancelUrl: window.location.href,
        });
    };
    const sizeButton = (sizeOption) => (
        <span
            onClick={() => setSize(sizeOption)}
            className={`${styles.option} ${size === sizeOption ? styles.selected : ''}`}
        >
            {sizeOption}
        </span>
    );
    return (
        <div className={styles.container}>
            <div>
                <img className={styles.image} src='https://pusher.world/wp-content/uploads/2024/05/Yank-on-This-1-1-scaled.jpg' />
            </div>
            <div>
                <h1>$35</h1>
                <p>this is a shirt. you get what you get. to be determined.</p>
                <p>this is a presale item. items will go into production after two weeks and ship out after.</p>
                <p>sizing info</p>
                <p>t-shirt printed on a something something blank</p>
                <h1>size</h1>
                {sizeButton('small')}
                {sizeButton('medium')}
                {sizeButton('large')}
                {sizeButton('xlarge')}
                <h1>quantity</h1>
                <input type='number' min="1" max="10" onChange={(e) => setQuantity(e.target.valueAsNumber)} />
                <button role="link" onClick={checkout}>
                    checkout
                </button>
            </div>
        </div>
    );
}