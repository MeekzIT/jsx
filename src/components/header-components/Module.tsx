import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/moduleSlice";
import Loading from "../loading/Loading";
import { Module } from "../../store/types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import CardSmall from "../cards/CardSmall";
import { useTranslation } from "react-i18next";

const ModuleHeader = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.module);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      <TransitionGroup component={null}>
        {data.map((i: Module) => (
          <CSSTransition key={i.id} timeout={2000} classNames="fade">
            <CardSmall
              key={i.id}
              data={i}
              image={{
                id: 1,
                reletedId: 1,
                image:
                  language === "am"
                    ? i?.imageAm
                    : language === "ru"
                    ? i?.imageRu
                    : language === "en"
                    ? i?.imageEn
                    : i?.imageGe,
                createdAt: "",
                updatedAt: "",
              }}
              href="/module/"
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ModuleHeader;
