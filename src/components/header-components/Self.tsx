import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/selfSlice";
import Loading from "../loading/Loading";
import CardSmall from "../cards/CardSmall";
import { Self } from "../../store/types";

const SelfHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.self);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="header-box">
      {data.map((i: Self) => (
        <CardSmall
          key={i.id}
          data={i}
          image={i.SelfWashImages[0]}
          href="/self/"
        />
      ))}
    </div>
  );
};

export default SelfHeader;
