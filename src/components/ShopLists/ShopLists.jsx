import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShopBox from "../ShopBox/ShopBox";
import { useParams } from "react-router-dom";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import httpRequest from "../../utils/httpRequests";

//Create Filter Dialog:
const FilterDialog = ({ open, onClose, onFilter }) => {
  const handleChipClick = (filterType) => {
    onFilter(filterType);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <Chip
          sx={{ mx: 2, width: 100, height: 50, fontSize: "1.4rem" }}
          label="Salon"
          onClick={() => handleChipClick("salon")}
        />
        <Chip
          sx={{ mx: 2, width: 100, height: 50, fontSize: "1.4rem" }}
          label="Barber"
          onClick={() => handleChipClick("barber")}
        />
        <Chip
          sx={{ mx: 2, width: 100, height: 50, fontSize: "1.4rem" }}
          label="Spa"
          onClick={() => handleChipClick("spa")}
        />
        {/* Add more chips for different filter types here */}
      </DialogContent>
    </Dialog>
  );
};

//Main Component
function ShopLists() {
  //
  // Set anchor for pop up any event in sort:
  const [anchorEl, setAnchorEl] = useState(null);
  const sortOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Pagination State
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //Control state for Shops
  const [shops, setShops] = useState([]);
  const { searchStr } = useParams();

  //Call API forr getting all shop based on search
  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await httpRequest.get(`salon/search/query`, {
          params: {
            pageSize: 8,
            pageNumber: currentPage,
            searchKey: searchStr,
          },
        });
        const totalPages = Math.ceil(response.data.salonPage.length / 2);
        setShops(response.data.salonPage.filter((shop) => shop !== null));
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    getShops();
  }, [searchStr, currentPage]);

  //Handle open the dialog
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  //Handle data from API Filter
  const handleFilter = async (page, filterType) => {
    try {
      const response = await httpRequest.get(`salon/filtered`, {
        params: {
          pageSize: 8,
          pageNumber: currentPage,
          salonType: filterType,
        },
      });
      const totalPages = Math.ceil(response.data.salonPage.length / 2);
      setShops(response.data.salonPage.filter((shop) => shop !== null));
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  //Handle Sort Click
  const handleSortClick = async (sortOption, page) => {
    try {
      const response = await httpRequest.get("salon", {
        params: {
          pageSize: 8,
          pageNumber: currentPage,
          sortOption: sortOption,
        },
      });
      const totalPages = Math.ceil(response.data.length / 2);
      setShops(response.data.filter((shop) => shop !== null));
      console.log(response.data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    }
    setAnchorEl(null);
  };

  // Handle click for change Sort Page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    handleSortClick(value);
  };

  // Example onFilter function implementation
  const onFilter = (filterType) => {
    // Call the handleFilter function with the current page and filterType
    handleFilter(currentPage, filterType);
  };

  return (
    <React.Fragment>
      <ShopListsWrapper>
        <Grid
          direction="row"
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {/* Display the filter, sort button */}
          {/* Display the filter */}
          <Grid item xs={4} sm={8} md={16}>
            <FilterRow>
              <FilterButton
                id="filter-button"
                variant="contained"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={handleFilterOpen}
              >
                Filter By
              </FilterButton>
              <FilterDialog
                open={filterOpen}
                onClose={handleFilterClose}
                onFilter={onFilter}
              />

              {/* Display the sort menu */}
              <FilterButton
                variant="contained"
                startIcon={<KeyboardArrowDownOutlinedIcon />}
                id="sort-button"
                aria-controls={sortOpen ? "sort-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={sortOpen ? "true" : undefined}
                onClick={handleClick}
              >
                Sort By
              </FilterButton>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={sortOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "sort-button",
                }}
                elevation={0}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  marginTop: 1,
                  minWidth: 180,
                }}
              >
                <MenuItem
                  sx={{ backgroundColor: "#EBEBEB" }}
                  onClick={() => handleSortClick("alphabetical", currentPage)}
                >
                  Sort A to Z
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#EBEBEB" }}
                  onClick={() => handleSortClick("rating", currentPage)}
                >
                  Highest rating to lowest
                </MenuItem>
              </Menu>
            </FilterRow>
          </Grid>
          {/* Display the Shops Lists */}
          {shops.map((spaShop) => {
            let imageUrl;
            if (spaShop.salonPhotos && spaShop.salonPhotos !== "") {
              // Split the salonPhotos string into an array
              const photos = spaShop.salonPhotos.split(",");
              // Find the wallpaper image
              const card = photos.find((photo) => photo.includes("card"));
              imageUrl = `http://localhost:3000/salon/pictures/${card}`;
            } else {
              // Provide a default image URL when salonPhotos is null
              imageUrl = "https://images.adsttc.com/media/images/5e01/6d86/3312/fd44/b400/026e/large_jpg/10_%E5%A4%A7%E5%A0%82%E6%B2%90%E8%B6%B3%E5%8C%BA.jpg?1577151868"; // replace with your default image URL
            }
            console.log(imageUrl);
            return (
              <Grid item xs={2} sm={4} md={4} key={spaShop.id}>
                <Box>
                  <ShopBox
                    key={spaShop.id}
                    spaShop={spaShop}
                    image={imageUrl}
                  />
                </Box>
              </Grid>
            );
          })}
          ;{/* Here is where i will put any component related to pagination */}
          <Grid item md={16} sm={8} xs={4}>
            <PaginationWrapper spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </PaginationWrapper>
          </Grid>
        </Grid>
      </ShopListsWrapper>
    </React.Fragment>
  );
}

const ShopListsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: theme.palette.background.default,
}));

const FilterRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: theme.spacing(4),
}));

const FilterButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "18px 18px 18px 18px",
  height: "40px",
  width: "10%",
  backgroundColor: theme.palette.primary.main,
  fontSize: "0.7rem",
  fontWeight: theme.typography.SemiBold,
  color: theme.palette.text.main,
}));

const PaginationWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default ShopLists;
