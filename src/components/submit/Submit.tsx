import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { backUrl } from "../../store/keys";
import { PriceResponse } from "../../store/types";

interface ISubmit {
  data: PriceResponse | null;
  onSubmitOrder: () => void;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const Submit = ({ data, onSubmitOrder }: ISubmit) => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    axios
      .post(`${backUrl}/constuctor/order`, {
        ...formData,
        order: JSON.stringify(data),
      })
      .then(function (response) {
        console.log(response);
        onSubmitOrder();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box sx={{ display: "flex", gap: "30px" }}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("name")}
                {...register("firstName", {
                  required: t("requiredField", { field: t("name") }),
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("surname")}
                {...register("lastName", {
                  required: t("requiredField", { field: t("surname") }),
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("email")}
                type="email"
                {...register("email", {
                  required: t("requiredField", { field: t("email") }),
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: t("invalidEmail"),
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("phone")}
                type="tel"
                {...register("phone", {
                  required: t("requiredField", { field: t("phone") }),
                  // pattern: {
                  //   value: /^\d{10,15}$/,
                  //   message: t("invalidPhone"),
                  // },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                {t("submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box
        sx={{
          width: "800px",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: "#008496" }}>
            {t("config")}
          </Typography>
          {data ? (
            <Box>
              {data.items?.map((i) => (
                <Box key={i.item?.id}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#008496" }}
                    gutterBottom
                  >
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
              {data.services?.map((i) => (
                <Box key={i.service?.id}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#008496" }}
                    gutterBottom
                  >
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
              <Typography variant="h5" sx={{ color: "#008496" }}>
                {data.price} $
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Submit;
