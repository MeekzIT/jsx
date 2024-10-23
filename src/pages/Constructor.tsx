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

  const { single, loading, error, service, priceData } = useAppSelector(
    (state) => state.constr
  );
  const [selectedData, setSelectedData] = useState<SelectedData>({
    variant: id,
    services: {},
  });
  const [selectedOption, setSelectedOption] = useState();
  const [selectedImages, setSelectedImages] = useState({
    service: {},
    option: {},
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSingle(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    single?.ConstuctorItems.map((s) => {
      const item = s.ConstuctorItemOptions;
      item.map((i) => {
        console.log(s, "selectedOption");

        if (i.showIn && !i.ConstuctorOptionItems.length) {
          console.log(i, "item");
          setSelectedImages((prevData) => {
            return {
              ...prevData,
              service: { ...prevData.service, [s.id]: i.image },
            };
          });
        }
        if (i.showIn && i.id == selectedOption) {
          console.log(i, "item");
          setSelectedImages((prevData) => {
            return {
              ...prevData,
              option: { ...prevData.option, [s.id]: i.image },
            };
          });
        }
      });
    });
  }, [single, selectedOption]);

  useEffect(() => {
    if (single?.ConstuctorItems) {
      const defaultSelections: { [key: number]: number | number[] } = {};

      single?.ConstuctorItems?.forEach((item: IConstuctorItems) => {
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
          setSelectedOption(itemWithOptions.id);
          dispatch(fetchSingleService(String(itemWithOptions.id)));
        }
      });
    }
  }, [dispatch, single, service]);

  useEffect(() => {
    dispatch(getDataPrice(selectedData));
  }, [dispatch, selectedData]);

  const handleSelectionChange = (
    key: number,
    value: number | number[],
    hasItems?: boolean
  ) => {
    if (hasItems) {
      dispatch(fetchSingleService(String(value)));
      setSelectedOption(value);
    }
    setSelectedData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
  };

  const handleSubmit = () => {
    dispatch(getDataPrice(selectedData));
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  console.log(
    selectedImages,
    Object.values(selectedImages.option),
    "selectedImages"
  );

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
          <img src={single?.image} alt="Main image" />
          {Object.values(selectedImages?.service)?.map((i) => {
            return <img src={i} alt="Main image" />;
          })}
          {Object.values(selectedImages?.option)?.map((i) => {
            return <img src={i} alt="Main image" />;
          })}
        </Box>

        {/* {priceData ? (
          <Box>
            {priceData.items?.map((i) => (
              <Box key={i.item?.id}>
                <Typography variant="h6" sx={{ color: "#00838D" }} gutterBottom>
                  {language === "am"
                    ? i.item?.nameAm
                    : language === "ru"
                    ? i.item?.nameRu
                    : language === "en"
                    ? i.item?.nameEn
                    : i.item?.nameGe}
                </Typography>
                {Array.isArray(i.options)
                  ? i.options.map((o) => (
                      <Typography key={o.id}>
                        {language === "am"
                          ? o.nameAm
                          : language === "ru"
                          ? o?.nameRu
                          : language === "en"
                          ? o?.nameEn
                          : o?.nameGe}
                      </Typography>
                    ))
                  : language === "am"
                  ? i.options?.nameAm
                  : language === "ru"
                  ? i.options?.nameRu
                  : language === "en"
                  ? i.options?.nameEn
                  : i.options?.nameGe}
              </Box>
            ))}
            {priceData.services?.map((i) => (
              <Box key={i.service?.id}>
                <Typography variant="h6" sx={{ color: "#00838D" }} gutterBottom>
                  {language === "am"
                    ? i.service?.nameAm
                    : language === "ru"
                    ? i.service?.nameRu
                    : language === "en"
                    ? i.service?.nameEn
                    : i.service?.nameGe}
                </Typography>
                {Array.isArray(i.options)
                  ? i.options.map((o) => (
                      <Typography key={o.id}>
                        {language === "am"
                          ? o.nameAm
                          : language === "ru"
                          ? o?.nameRu
                          : language === "en"
                          ? o?.nameEn
                          : o?.nameGe}
                      </Typography>
                    ))
                  : language === "am"
                  ? i.options?.nameAm
                  : language === "ru"
                  ? i.options?.nameRu
                  : language === "en"
                  ? i.options?.nameEn
                  : i.options?.nameGe}
              </Box>
            ))}
             <hr />
            <Typography variant="h5" sx={{ color: "#00838D" }}>
              {priceData.price} $
            </Typography>
          </Box>
        ) : null} */}
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
                    value={selectedData.services[i.id]} // Set default value
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
