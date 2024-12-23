import { StyleSheet } from "../Lib/renderers/html";

export const home = StyleSheet.Create({
    page: {
        gap: "20px",
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
