import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
    baseURL: productionUrl,
});

export function formatPrice(price) {
    const dollarAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format((price / 100).toFixed(2));

    return dollarAmount;
}

export function generateAmountOptions(number) {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;
        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        );
    });
}
