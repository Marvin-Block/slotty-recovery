import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import theme from "../../src/theme";

export default function Footer() {
    return (
        <Container component="footer" maxWidth={false} sx={{ padding: "16px 0", px: { xs: 3, sm: 24, md: 32 }, paddingTop: 2, paddingBottom: 5, marginTop: "auto", backgroundColor: "transparent", borderTop: `1px solid ${theme.palette.primary.main}`  }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" } , flexWrap: "wrap" }}>
                
                <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", justifyContent: "center", flexWrap: "wrap", marginBottom: "auto", maxWidth: "30%" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "bold" }}>SlottyRecovery</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: "break-word" }}>SlottyRecovery is a Discord Recovery Service, that allows you to restore your Discord Guild after being nuked, raided, or otherwise lost.</Typography>
                </Box>

                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", marginBottom: "auto" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "bold" }}>Social</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: "break-word" }}>
                        <Link href="https://twitter.com/SlottyRecovery" target="_blank">Twitter</Link>
                        <br />
                        <Link href="https://youtube.com/channel/UCdO4LjbTjSJWxP9VQg7ZNXw" target="_blank">YouTube</Link>
                        <br />
                        <Link href="https://github.com/SlottyRecovery" target="_blank">GitHub</Link>
                    </Typography>
                </Box>

                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", marginBottom: "auto" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "bold" }}>Resources</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: "break-word" }}>
                        <Link href="https://community.slotty.cc" target="_blank">Support</Link>
                        <br />
                        <Link href="https://docs.slotty.cc" target="_blank">Documentation</Link>
                    </Typography>
                </Box>

                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", marginBottom: "auto" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "bold" }}>Legal</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: "break-word" }}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <br />
                        <Link href="/terms">Terms of Service</Link>
                        <br />
                        <Link href="/refund-policy">Refund Policy</Link>
                    </Typography>
                </Box>

            </Box>
        </Container>
    )
}