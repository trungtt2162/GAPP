import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@emotion/react';
import { theme } from '../../theme';
import Navbar from '../../components/layout/Navbar';

const HistoryFamily = () => {
    const { palette } = useTheme(theme);
  return (
      <div>
          <Navbar />
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
                  HistoryFamily
              </Box>
          </div>
      </div>
  )
}

export default HistoryFamily