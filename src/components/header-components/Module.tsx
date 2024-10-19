import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/moduleSlice";
import Loading from "../loading/Loading";
import { Module } from "../../store/types";
import CardSmall from "../cards/CardSmall";

const ModuleHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.module);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      {data.map((i: Module) => (
        <CardSmall
          key={i.id}
          data={i}
          image={i.ModuleImages[0]}
          href="/module/"
        />
      ))}
    </div>
  );
};

export default ModuleHeader;
