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
import { SimpleDialog } from "../components/dialog/Dialog";
import Submit from "../components/submit/Submit";

const Constructor = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
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
  const [open, setOpen] = useState<boolean>(false);
  const [openNitify, setOpenNitify] = useState(false);
  const [selectedImages, setSelectedImages] = useState({
    service: [],
    option: [],
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
          setSelectedImages((prevData) => {
            return {
              ...prevData,
              service: [
                ...prevData.service,
                { image: i.image, width: i.width, height: i.height },
              ],
            };
          });
        }
        if (i.showIn && i.id == selectedOption) {
          console.log(i, "item");
          setSelectedImages((prevData) => {
            return {
              ...prevData,
              option: [
                ...prevData.service,
                { image: i.image, width: i.width, height: i.height },
              ],
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
    console.log(selectedData, "selectedData");
    dispatch(getDataPrice(selectedData));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        height: { xs: "calc(100vh - 300px)", md: "calc(100vh - 200px)" },
        display: "flex",
        overflow: { xs: "hidden", md: "hidden" },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        item
        xs={12}
        sm={6}
        sx={{
          padding: "20px",
          width: { xs: "100%", md: "60%" },
          height: { xs: "60%", md: "100%" },
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          // position: { xs: "fixed", md: "static" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img
            src={single?.image}
            alt="Main image"
            width={single?.width}
            height={single?.height}
          />
          {selectedImages?.service?.map((i) => {
            console.log(i, "111");
            if (i) {
              return (
                <img
                  src={i.image}
                  alt="Main image"
                  width={i?.width}
                  height={i?.height}
                />
              );
            }
          })}
          {selectedImages?.option?.map((i) => {
            if (i) {
              return (
                <img
                  src={i.image}
                  alt="Main image"
                  width={i?.width}
                  height={i?.height}
                />
              );
            }
          })}
        </Box>
      </Box>
      <Box
        item
        xs={6}
        sm={6}
        md={6}
        sx={{
          width: { xs: "100%", md: "40%" },
          height: { xs: "70%", md: "100%" },
          top: { xs: "100vh", md: "0" },
          padding: { xs: "0", md: "20px" },
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant={"h5"}>
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
            // flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "20px",
            overflowY: "auto",
            // paddingRight: "10px",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderTop: "1px solid #00838D",
            padding: "20px 0",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: "#00838D" }}>
              {priceData?.price} $
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" sx={{ ml: 3 }} onClick={handleSubmit}>
              {t("submit")}
            </Button>
          </Box>
        </Box>
      </Box>
      <SimpleDialog open={open} onClose={handleClose}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ color: "#00838D", mb: 2 }}>
            {language === "am"
              ? single?.nameAm
              : language === "ru"
              ? single?.nameRu
              : language === "en"
              ? single?.nameEn
              : single?.nameGe}
          </Typography>
          <Submit
            data={priceData}
            onSubmitOrder={() => {
              handleClose();
              setOpenNitify(true);
            }}
          />
        </Box>
      </SimpleDialog>
      <SimpleDialog open={openNitify} onClose={() => setOpenNitify(false)}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ color: "#00838D" }}>
            {t("orderResponse")}
          </Typography>
        </Box>
      </SimpleDialog>
    </Box>
  );
};

export default Constructor;
