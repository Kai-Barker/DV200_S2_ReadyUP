import "../css/SearchBar.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <div style={{ width: "100%" }}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Search"
            multiline
            maxRows={4}
            sx={{
                //  width: "15vw",
                 
              "& .MuiInputBase-input": {
                color: "#EDE4F1",
                fontFamily: 'Audiowide, sans-serif'
              },
              "& .MuiInputLabel-root": { color: "#EDE4F1",
                fontFamily: 'Audiowide, sans-serif',},
              "& .MuiInputLabel-root.Mui-focused": { color: "#EDE4F1" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",
                "& fieldset": { borderColor: "#EDE4F1" },
                "&:hover fieldset": { borderColor: "#EDE4F1" },
                "&.Mui-focused fieldset": { borderColor: "#EDE4F1" },
              },
            }}
            //     InputProps={{
            //     style: {
            //       color: '#EDE4F1', // Sets the input text color to blue
            //     },
            //   }}
          />
        </div>
      </Box>
    </div>
  );
};
export default SearchBar;
