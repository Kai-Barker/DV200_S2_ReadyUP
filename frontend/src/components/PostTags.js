import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const PostTags = ({tags, setTags, currentTags}) => {
  const handleTagChange = (e, newTags) => {
      const normalizedValue = newTags.map((option) => {
        console.log(typeof option);
        
        if (typeof option === "string") {
          return { tag_name: option };
        }
        return option;
      });
      setTags(normalizedValue);
  };
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        className="cursor-target"
        multiple
        id="tags-outlined"
        options={currentTags}
        getOptionLabel={(option) => option.tag_name}
        filterSelectedOptions
        freeSolo
        value={tags}
        onChange={handleTagChange}
        renderInput={(params) => <TextField {...params} label="Add Tags" placeholder="Tags" />}
        slotProps={{
          clearIndicator: {
            sx: {
              color: "#EDE4F1", // Your custom color
              "&:hover": {
                color: "white", // Color on hover
              },
            },
          },
          chip: {
            sx: {
              color: "#EDE4F1",
              border: "1px solid #EDE4F1",
              "& .MuiChip-deleteIcon": {
                color: "#EDE4F1",
              },
              "&:hover .MuiChip-deleteIcon": {
                color: "#EDE4F1",
              },
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "25vh",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EDE4F1", // Default border color
            borderWidth: "2px",
            borderRadius: "15px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EDE4F1 !important",
            borderWidth: "3px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EDE4F1", // Focused border color
          },
          "& .MuiInputBase-input": {
            color: "#EDE4F1",
            fontFamily: "Audiowide, sans-serif",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#EDE4F1",
            fontFamily: "Audiowide, sans-serif",
          },
          "& .MuiInputLabel-root": {
            color: "#EDE4F1",
            "&.Mui-focused": {
              color: "#EDE4F1 !important",
            },
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "#EDE4F1",
          },
        }}
      />
    </Stack>
  );
};
export default PostTags;

// Dummy data
const dummyTags = [{ title: "18+" }, { title: "Casual" }, { title: "Competitive" }, { title: "Mic Required" }, { title: "Beginners Welcome" }];
