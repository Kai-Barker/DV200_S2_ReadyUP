import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const TagFilterer = ({currentTags, selected, onChange}) => {
  // const [tags, setTags] = new useState([]);
  const handleTagChange = (e, newTags) => {
    if (newTags.length <= 3) {
      const newTagStrings = newTags.map( tag => tag.tag_name);
      onChange(newTagStrings);
    }
  };
  const selectedTagObjects = currentTags.filter(tag => 
    selected?.includes(tag.tag_name)
  );
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        className="cursor-target"
        multiple
        id="tags-outlined"
        options={currentTags}
        getOptionLabel={(option) => option.tag_name}
        filterSelectedOptions
        value={selectedTagObjects}
        onChange={handleTagChange}
        renderInput={(params) => (
          <TextField {...params} label="Filter By Tags" placeholder="Tags" />
        )}
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
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EDE4F1", // Default border color
            borderWidth: "2px",
            borderRadius: "50px",
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
              color: "#EDE4F1 !important", // The !important flag is key here
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
export default TagFilterer;
