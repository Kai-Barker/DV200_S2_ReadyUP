import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

const SortByDropdown = () => {
  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className="cursor-target">
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "#EDE4F1",
            fontFamily: 'Audiowide, sans-serif',
            '&.Mui-focused': { color: '#EDE4F1' },
          }}
        >
          Sort By:
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort By"
          onChange={handleChange}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              color: "#EDE4F1",
              border: "2px solid #EDE4F1",
              borderRadius: 40,
            },'&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EDE4F1',
              borderWidth: '3px',
            },'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EDE4F1',
              borderWidth: '2px',
            },'& .MuiInputBase-input':{
                color: '#EDE4F1',
                fontFamily: 'Audiowide, sans-serif'
            }
          }}
        >
          <MenuItem value="name" style={{fontFamily: 'Audiowide, sans-serif'}}>Name</MenuItem>
          <MenuItem value="popularity" style={{fontFamily: 'Audiowide, sans-serif'}}>Most Popular</MenuItem>
          <MenuItem value="popularity_desc" style={{fontFamily: 'Audiowide, sans-serif'}}>Most Popular DESC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortByDropdown;
