import {FaDiscord} from "react-icons/fa";
import {Container, Link, Text} from "@radix-ui/themes";
import {Box} from "@radix-ui/themes";

export default function Footer () {
    return (
        <footer style={{
            backgroundColor: "#412368",
            color: "#fff",
            flexDirection: "column",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            minHeight: "5vh",
            padding: "1rem",
        }}>

            <Box style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <Link href="https://discord.gg/bt3H3PcjeC" target="_blank"
                      style={{fontSize: '28px', cursor: 'var(--cursor-link)'}}><FaDiscord size={32}/></Link>


            </Box>
            <Text>&copy; 2024 InkTail</Text>


        </footer>
    );
}