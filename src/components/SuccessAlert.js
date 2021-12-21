import Image from "next/image";

function SuccessAlert({ title, image }) {
    return (
        <div class="">
            <h1 className="text-xs font-bold">ADDED TO BASKET</h1>
            <p className="line-clamp-1">{title}</p>
        </div>
    );
}

export default SuccessAlert;
