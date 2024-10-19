import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type FormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  question: string;
};

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginRight: "10px", color: "#00838D" }}
        gutterBottom
      >
        {t("contactUs")}
      </Typography>
      <Typography>{t("contactUsDesc")}</Typography>
      <Grid container spacing={4} sx={{ margin: "10px 0" }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon sx={{ marginRight: "10px", color: "#00838D" }} />
            <Typography>
              {t("workingDays")} : {t("mondayToSaturday")}. {t("workingHours")}{" "}
              : 09:00-18:00
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <PhoneIcon sx={{ marginRight: "10px", color: "#00838D" }} />
            <Typography>+374 77-14-54-04, +374 98-76-97-60</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ marginRight: "10px", color: "#00838D" }} />
            <Typography>Email: info@jsxmachines.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ marginRight: "10px", color: "#00838D" }} />
            <Typography>Алек Манукян 11/1, Армения, Ереван</Typography>
          </Box>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("name")}
              {...register("name", {
                required: t("requiredField", { field: t("name") }),
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("surname")}
              {...register("surname", {
                required: t("requiredField", { field: t("surname") }),
              })}
              error={!!errors.surname}
              helperText={errors.surname?.message}
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
                pattern: {
                  value: /^\d{10,15}$/,
                  message: t("invalidPhone"),
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("question")}
              multiline
              rows={4}
              {...register("question", {
                required: t("requiredField", { field: t("question") }),
              })}
              error={!!errors.question}
              helperText={errors.question?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              {t("submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactUs;
