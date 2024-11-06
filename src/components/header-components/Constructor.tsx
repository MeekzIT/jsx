import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../loading/Loading";
import { fetchData } from "../../store/slices/constructorSlice";
import CardSmall from "../cards/CardSmall";
import { IConstructor } from "../../store/types";

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
      {data.map((i: IConstructor) => (
        <CardSmall
          key={i.id}
          data={i}
          image={{
            image: i.image,
            id: i.id,
            createdAt: "",
            updatedAt: "",
            reletedId: 1,
          }}
          href="/constuctor/"
        />
      ))}
    </div>
  );
};

export default ConstructorHeader;
