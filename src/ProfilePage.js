import React, { useState } from "react";
import { Box, Button, Typography, TextField, Avatar, Card as MuiCard, Divider, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CustomAppBar from './CustomAppBar'; // Assuming you want to keep the custom app bar

// Styled Components
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

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProfilePage = () => {
  const navigate = useNavigate();

  // User information (Dummy data for the example)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    bio: "A short bio about John Doe.",
    profilePic: "/path/to/profile-pic.jpg",
  });

  // State to handle form submission or updating data
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setUserData(formData);
    setEditMode(false);
  };

  return (
    <>
      <CustomAppBar /> {/* CustomAppBar as the navigation bar at the top */}
      <ProfileContainer sx={{ mt: 15 }}>
        <Card>
          <Typography variant="h4" gutterBottom>
            {editMode ? "Edit Profile" : "Profile Details"}
          </Typography>

          {/* Profile Picture */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2,  }}>
            <Avatar
              alt="User Profile Picture"
              src={userData.profilePic}
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Profile Information */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!editMode}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: "white", color: "black" }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", color: "white" }}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Card>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;
