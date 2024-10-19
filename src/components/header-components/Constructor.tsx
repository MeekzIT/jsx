import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../loading/Loading";
import { fetchData } from "../../store/slices/constructorSlice";
import CardSmall from "../cards/CardSmall";

const ConstructorHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.constr);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      {data.map((i: any) => (
        <CardSmall
          key={i.id}
          data={i}
          image={{ image: i.image }}
          href="/constuctor/"
        />
      ))}
    </div>
  );
};

export default ConstructorHeader;
