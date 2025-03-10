import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../Api/axiosinstance";

export default function PaymentSuccess() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    axiosInstance
      .post(`/add-payment`, {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("here", error);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        className="mt-6 w-96 text-center border-2 border-green-500 rounded-lg shadow-lg"
        placeholder={undefined}
      >
        <CardBody
          className="flex flex-col items-center justify-center"
          placeholder={undefined}
        >
          {/* Center the content */}
          <CheckCircleIcon className="h-12 w-12 text-green-500 mb-4" />
          <Typography
            variant="h5"
            color="green"
            className="mb-2"
            placeholder={undefined}
          >
            Payment Successful
          </Typography>
          <Typography placeholder={undefined}>
            Your payment has been successfully processed.
          </Typography>
        </CardBody>

        <CardFooter
          className="pt-0 flex justify-center"
          placeholder={undefined}
        >
          <Link to={`/profile/booking?id=${id}`}>
            <Button
              size="sm"
              variant="text"
              className="flex justify-center gap-2"
              placeholder={undefined}
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
