import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import {
  fetchCurrency,
  fetchSingle,
  fetchSingleService,
  getDataPrice,
} from "../store/slices/constructorSlice";
import Loading from "../components/loading/Loading";
import { Box, Typography, Button } from "@mui/material";
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

interface ISelectedImagesItem {
  image: string | undefined;
  width: string;
  height: string;
}
interface ISelectedImages {
  service: ISelectedImagesItem[];
  option: ISelectedImagesItem[];
}

const Constructor = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const dispatch = useAppDispatch();
  const {
    single,
    loading,
    error,
    service,
    priceData,
    currentCurrency,
    activeId,
  } = useAppSelector((state) => state.constr);
  const [selectedData, setSelectedData] = useState<SelectedData>({
    variant: id,
    services: {},
  });
  const [selectedOption, setSelectedOption] = useState<
    number | undefined | number[]
  >();
  const [open, setOpen] = useState<boolean>(false);
  const [openNitify, setOpenNitify] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ISelectedImages>({
    service: [],
    option: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSingle(id));
      dispatch(fetchCurrency());
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getDataPrice(selectedData));
  }, [dispatch, selectedData]);

  useEffect(() => {
    single?.ConstuctorItems?.map((s: IConstuctorItems) => {
      const item = s.ConstuctorItemOptions;
      item.map((i) => {
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
          defaultSelections[item.id] =
            item.withValue && activeId
              ? activeId
              : item.ConstuctorItemOptions[0].id;
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
            item.withValue && activeId
              ? activeId
              : item.ConstuctorItemOptionItemOptions[0]?.id;
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

  const optios = useMemo(() => {
    return (
      single?.ConstuctorItems &&
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
            defaultValue={
              i.withValue && activeId ? activeId : i.ConstuctorItemOptions[0]?.id
            }
            options={i?.ConstuctorItemOptions}
            name={name}
            onChange={(value, hasItems) =>
              handleSelectionChange(i.id, Number(value), hasItems)
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
      })
    );
  }, [single?.ConstuctorItems, currentCurrency, activeId]);

  const servicesOptios = useMemo(() => {
    return service?.ConstuctorOptionItems.map((i: IConstuctorOptionItems) =>
      i.require ? (
        <RadioBox
          key={i.id}
          options={i?.ConstuctorItemOptionItemOptions}
          defaultValue={
            i.withValue && activeId
              ? activeId
              : i.ConstuctorItemOptionItemOptions[0]?.id
          }
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
            handleSelectionServiceChange(i.id, Number(value))
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
          onChange={(value) => handleSelectionServiceChange(i.id, value)}
        />
      )
    );
  }, [service, currentCurrency, activeId]);

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
        sx={{
          padding: "20px",
          width: { xs: "100%", md: "60%" },
          height: { xs: "60%", md: "100%" },
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
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
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "20px",
            overflowY: "auto",
          }}
        >
          {optios}

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
              {servicesOptios}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderTop: "1px solid #008496",
            padding: "20px 0",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: "#008496" }}>
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
          <Typography variant="h4" sx={{ color: "#008496", mb: 2 }}>
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
          <Typography variant="h3" sx={{ color: "#008496" }}>
            {t("orderResponse")}
          </Typography>
        </Box>
      </SimpleDialog>
    </Box>
  );
};

export default Constructor;
