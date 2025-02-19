import React, { useState } from "react";
import { Box, Button, Typography, Card as MuiCard, Divider, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // useNavigate to handle page redirection after payment
import CustomAppBar from './CustomAppBar'; // Import CustomAppBar

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const ConfirmPaymentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

// Borderless table style
const borderlessTableStyles = {
  "& .MuiTableCell-root": {
    borderBottom: "none", // Remove borders from all cells
  },
};

export default function ConfirmPayment() {
  const navigate = useNavigate();

  // Dummy Data for Asset
  const asset = {
    name: "Laptop",
    serial_number: "SN123456",
    category: "Laptops",
    value: 50000.00,
    state: "Active",
  };

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment process (e.g., an API request to process payment)
    setTimeout(() => {
      navigate("/home"); // Redirect to success page after payment
    }, 2000); // Simulate a delay of 2 seconds for payment processing
  };

  return (
    <>
      <CustomAppBar /> {/* Add CustomAppBar at the top */}

      <ConfirmPaymentContainer>
        <Card sx={{ p: 4, mt: 15 }}>
          <Typography variant="h5" gutterBottom>
            Confirm Asset Details and Payment
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Borderless Table to Display Asset Information */}
          <TableContainer>
            <Table sx={borderlessTableStyles}>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Asset Name:
                  </TableCell>
                  <TableCell>{asset.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Serial Number:
                  </TableCell>
                  <TableCell>{asset.serial_number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Category:
                  </TableCell>
                  <TableCell>{asset.category}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Value:
                  </TableCell>
                  <TableCell>Ksh {asset.value}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    State:
                  </TableCell>
                  <TableCell>{asset.state}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" color="primary">
            Payment Amount: Ksh 50
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "black", color: "white" }}
            onClick={handlePayment}
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Processing Payment..." : "Confirm Payment"}
          </Button>
        </Card>
      </ConfirmPaymentContainer>
    </>
  );
}
