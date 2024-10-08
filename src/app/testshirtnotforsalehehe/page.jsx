"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import styles from "./page.module.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const priceMap = {
  small: process.env.NEXT_PUBLIC_S_SHIRT_PRICE_ID,
  medium: process.env.NEXT_PUBLIC_M_SHIRT_PRICE_ID,
  large: process.env.NEXT_PUBLIC_L_SHIRT_PRICE_ID,
  xlarge: process.env.NEXT_PUBLIC_XL_SHIRT_PRICE_ID,
};

export default function ShirtPage() {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const checkout = async (e) => {
    if (!size || Number.isNaN(quantity)) return;
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceMap[size],
          quantity,
        },
      ],
      mode: "payment",
      shippingAddressCollection: { allowedCountries: ["US"] },
      successUrl: `${window.location.origin}/thanks`,
      cancelUrl: window.location.href,
    });
  };
  const sizeButton = (sizeOption) => (
    <span
      onClick={() => setSize(sizeOption)}
      className={`${styles.option} ${
        size === sizeOption ? styles.selected : ""
      }`}
    >
      {sizeOption}
    </span>
  );
  return (
    <div className={styles.container}>
      <div className={styles["image-container"]} id="gallery">
        <a
          href="https://pusher.world/wp-content/uploads/2024/05/Yank-on-This-1-1-scaled.jpg"
          data-pswp-width="2500"
          data-pswp-height="1668"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={styles.image}
            src="https://pusher.world/wp-content/uploads/2024/05/Yank-on-This-1-1-scaled.jpg"
          />
        </a>
        <a
          href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg"
          data-pswp-width="1669"
          data-pswp-height="2500"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
            alt=""
          />
        </a>
        <a
          href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/7/img-2500.jpg"
          data-pswp-width="1875"
          data-pswp-height="2500"
          data-cropped="true"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/7/img-200.jpg"
            alt=""
          />
        </a>
        <a
          href="https://unsplash.com"
          data-pswp-src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg"
          data-pswp-width="2500"
          data-pswp-height="1666"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg"
            alt=""
          />
        </a>
      </div>
      <div className={styles["info-container"]}>
        <h1>$35</h1>
        <h2>connected shirt</h2>
        <br />
        <p>
          this is a presale item. items will go into production after two weeks
          and ship out after.
        </p>
        <br />
        <h2>sizing info</h2>
        <p>printed on a comfort colors 1717 heavyweight tee</p>
        <br />
        <h2>size</h2>
        {sizeButton("small")}
        {sizeButton("medium")}
        {sizeButton("large")}
        {sizeButton("xlarge")}
        <br />
        <br />
        <h2>quantity</h2>
        <input
          type="number"
          inputMode="numeric"
          defaultValue="1"
          min="1"
          max="10"
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
        />
        <button role="link" onClick={checkout}>
          checkout
        </button>
      </div>
    </div>
  );
}
