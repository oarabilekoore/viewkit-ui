import { StyleSheet } from "rosana";
export const home = StyleSheet.Create({
    nav: {
        width: "100%",
        height: "60px",
        backgroundColor: "white",
    },
    text: {
        color: "black",
    },
    body: {
        backgroundColor: "orange",
    },
    image: {
        width: "150px",
        height: "auto",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#61dafb",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#21a1f1",
        },
    },
});
export const notFound = StyleSheet.Create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    notFoundText: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginTop: "20px",
    },
    oopsText: {
        fontSize: "16px",
        color: "#666",
        textAlign: "center",
        marginTop: "10px",
    },
});
