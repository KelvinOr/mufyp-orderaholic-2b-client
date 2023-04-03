export default function RedirectPaht(){
    if (window.location.hostname === "localhost" || window.location.hostname === "" | window.location.hostname === "127.0.0.1") {
        return {
            home: "/",
            createInfo: "/createInfo",
            disboard: "/disboard",
        }
    } else {
        return {
            home: "/",
            //createInfo: "/#/createInfo",
            createInfo: "/createInfo",
            //disboard: "/#/disboard",
            disboard: "/disboard",
        }
    }
}