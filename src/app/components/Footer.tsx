export default function Footer () {
    return (
        <footer style={{
            backgroundColor: "#412368",
            color: "#fff",
           flexDirection: "column",
            textAlign: "center",
            display: "flex", // Add this
            justifyContent: "space-between", // Add this
            minHeight: "20vh",
            }}>
            <p>&copy; 2024 InkTail</p>
        </footer>
    );
}