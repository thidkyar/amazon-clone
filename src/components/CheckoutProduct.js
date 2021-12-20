import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
    addToBasket,
    removeFromBasket,
    addQuantity,
    removeQuantity,
} from "../slices/basketSlice";

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
    quantity,
}) {
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };
        //push item to redux
        dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        //remove item from redux
        dispatch(removeFromBasket({ id }));
    };
    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain" />

            {/* Middle section */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>

                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="CAD" />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            src="http://links.papareact.com/fdw"
                            className="w-12"
                        />
                        <p className="text-xs text-gray-500">
                            FREE One-day Delivery
                        </p>
                    </div>
                )}
            </div>
            {/* RIGHT ADD/REMOVE BUTTON */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex flex-row justify-between items-center text-center">
                    <button
                        className="button"
                        onClick={() => dispatch(removeQuantity({ id }))}
                    >
                        -
                    </button>
                    <p className="w-full">Quantity: {quantity}</p>
                    <button
                        className="button"
                        onClick={() => dispatch(addQuantity({ id }))}
                    >
                        +
                    </button>
                </div>
                <button className="button" onClick={removeItemFromBasket}>
                    Remove from Basket
                </button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
