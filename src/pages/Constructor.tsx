import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import {
  fetchSingle,
  fetchSingleService,
  getDataPrice,
} from "../store/slices/constructorSlice";
import Loading from "../components/loading/Loading";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  IConstuctorItems,
  IConstuctorOptionItems,
  SelectedData,
} from "../store/types";
import RadioBox from "../components/radio/Radio";
import CheckboxBox from "../components/checkbox/Checkbox";

const Constructor = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const language = i18n.language;
  const dispatch = useAppDispatch();

  const [selectedData, setSelectedData] = useState<SelectedData>({
    variant: id,
    services: {},
  });

  const [selectedImages, setSelectedImages] = useState<{
    [key: number]: string;
  }>({});

  const { single, loading, error, service, priceData } = useAppSelector(
    (state) => state.constr
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingle(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (single?.ConstuctorItems) {
      const defaultSelections: { [key: number]: number | number[] } = {};
      single.ConstuctorItems?.forEach((item: IConstuctorItems) => {
        if (item.require && item.ConstuctorItemOptions.length > 0) {
          defaultSelections[item.id] = item.ConstuctorItemOptions[0].id;
        }
      });

      setSelectedData((prevState) => ({
        ...prevState,
        ...defaultSelections,
      }));
    }
  }, [single]);

  useEffect(() => {
    if (service?.ConstuctorOptionItems) {
      const defaultServiceSelections: { [key: number]: number | number[] } = {};
      service.ConstuctorOptionItems.forEach((item: IConstuctorOptionItems) => {
        if (item.require && item?.ConstuctorItemOptionItemOptions?.length > 0) {
          defaultServiceSelections[item.id] =
            item.ConstuctorItemOptionItemOptions[0].id;
        }
      });

      setSelectedData((prevState) => ({
        ...prevState,
        services: {
          ...prevState.services,
          ...defaultServiceSelections,
        },
      }));
      dispatch(
        getDataPrice({ ...selectedData, services: defaultServiceSelections })
      );
    }
  }, [service, dispatch]);

  useEffect(() => {
    if (!service && single?.ConstuctorItems) {
      single.ConstuctorItems?.forEach((s) => {
        const itemWithOptions = s.ConstuctorItemOptions.find(
          (i) => i.ConstuctorOptionItems.length > 0
        );
        if (itemWithOptions) {
          dispatch(fetchSingleService(String(itemWithOptions.id)));
        }
      });
    }
  }, [dispatch, single, service]);

  const handleSelectionChange = (
    key: number,
    value: number | number[],
    hasItems?: boolean
  ) => {
    if (hasItems) {
      dispatch(fetchSingleService(String(value)));
    }
    setSelectedData((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    // Update selected images based on the new value
    const selectedOption = single.ConstuctorItems.find(
      (item) => item.id === key
    )?.ConstuctorItemOptions.find((option) => option.id === value);
    if (selectedOption) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [key]: selectedOption.image, // assuming the options have an image property
      }));
    }
  };

  const handleSelectionServiceChange = (
    key: number,
    value: number | number[]
  ) => {
    setSelectedData((prevState) => ({
      ...prevState,
      services: {
        ...prevState.services,
        [key]: value,
      },
    }));

    // Update selected images for services
    const selectedServiceOption = service?.ConstuctorOptionItems.find(
      (item) => item.id === key
    )?.ConstuctorItemOptionItemOptions.find((option) => option.id === value);
    if (selectedServiceOption) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [key]: selectedServiceOption.image, // assuming the options have an image property
      }));
    }
  };

  const handleSubmit = () => {
    dispatch(getDataPrice(selectedData));
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  console.log(selectedImages, "ll");

  return (
    <Box
      sx={{
        height: "calc(100vh - 200px)",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          padding: "20px",
          flexBasis: "60%",
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={single?.image} alt="image" />
        </Box>

        {/* Displaying selected images */}
        <Box sx={{ mt: 2 }}>
          {Object.entries(selectedImages).map(([key, imageUrl]) => (
            <Box key={key}>
              <img
                src={imageUrl}
                alt={`Option for ${key}`}
                style={{ width: "100px", height: "auto", margin: "5px" }}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          flexBasis: "40%",
          padding: "20px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">
          {language === "am"
            ? single?.nameAm
            : language === "ru"
            ? single?.nameRu
            : language === "en"
            ? single?.nameEn
            : single?.nameGe}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {single?.ConstuctorItems &&
            single?.ConstuctorItems.map((i: IConstuctorItems) => {
              const name =
                language === "am"
                  ? i?.nameAm
                  : language === "ru"
                  ? i?.nameRu
                  : language === "en"
                  ? i?.nameEn
                  : i?.nameGe;

              return i.require ? (
                <RadioBox
                  key={i.id}
                  options={i?.ConstuctorItemOptions}
                  name={name}
                  value={selectedData[i.id]} // Set default value
                  onChange={(value, hasItems) =>
                    handleSelectionChange(i.id, value, hasItems)
                  }
                />
              ) : (
                <CheckboxBox
                  key={i.id}
                  options={i?.ConstuctorItemOptions}
                  name={name}
                  onChange={(value) => handleSelectionChange(i.id, value)}
                />
              );
            })}

          {service && (
            <>
              <Typography variant="h6" sx={{ ml: 3 }}>
                {language === "am"
                  ? service?.nameAm
                  : language === "ru"
                  ? service?.nameRu
                  : language === "en"
                  ? service?.nameEn
                  : service?.nameGe}
              </Typography>

              {service?.ConstuctorOptionItems.map((i: IConstuctorOptionItems) =>
                i.require ? (
                  <RadioBox
                    key={i.id}
                    options={i?.ConstuctorItemOptionItemOptions}
                    name={
                      language === "am"
                        ? i?.nameAm
                        : language === "ru"
                        ? i?.nameRu
                        : language === "en"
                        ? i?.nameEn
                        : i?.nameGe
                    }
                    value={selectedData.services[i.id]} // Set default value for services
                    onChange={(value) =>
                      handleSelectionServiceChange(i.id, value)
                    }
                  />
                ) : (
                  <CheckboxBox
                    key={i.id}
                    options={i?.ConstuctorItemOptionItemOptions}
                    name={
                      language === "am"
                        ? i?.nameAm
                        : language === "ru"
                        ? i?.nameRu
                        : language === "en"
                        ? i?.nameEn
                        : i?.nameGe
                    }
                    onChange={(value) =>
                      handleSelectionServiceChange(i.id, value)
                    }
                  />
                )
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            pl: 3,
            pr: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #00838D",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: "#00838D" }}>
              {priceData?.price} $
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 3 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Constructor;
