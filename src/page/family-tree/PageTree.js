import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react';
import { theme } from "../../theme";
import Navbar from '../../components/layout/Navbar';

const PageTree = () => {
    const { palette } = useTheme(theme);
    return (
        <div>
            {/* <Navbar /> */}
            <Box
                width="100%"
                max-width="10w"
                sx={{
                    backgroundColor: palette.secondary.main,
                    p: "2.5rem",
                }}
            >
            </Box>
            <div className="how-work">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { md: "flex-end", xs: "center" },
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: { md: "space-between", xs: "center" },
                        p: "6vh 15% 2rem 15%",
                    }}
                >
                    pageTree
                </Box>
            </div>
        </div>

    )
}

export default PageTree