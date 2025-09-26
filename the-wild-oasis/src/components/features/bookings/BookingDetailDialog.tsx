import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Booking } from "@/types/bookings.types";
import {
  CheckCircle,
  DollarSign,
  EyeIcon,
  Home,
  MessageSquareText,
} from "lucide-react";

export function BookingDetailDialog({ booking }: { booking: Booking }) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center ps-2 gap-2 hover:bg-muted">
        <EyeIcon size={18} />
        See Detail
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-5 w-5 text-blue-600" />
            {booking.numNights} nights in Cabin{" "}
            <span className="font-bold">{booking.cabins.name}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {new Date(booking.startDate).toDateString()} —{" "}
            {new Date(booking.endDate).toDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
            {booking.guests.countryFlag && (
              <img
                src={booking.guests.countryFlag}
                alt={booking.guests.fullName}
                className="h-5 w-7 rounded-sm border"
              />
            )}
            <p className="font-medium">
              {booking.guests.fullName}
              {booking.numGuests > 1 && ` + ${booking.numGuests - 1} guests`}
            </p>
            <span>&bull;</span>
            <p>{booking.guests.email}</p>
            <span>&bull;</span>
            <p>National ID {booking.guests.nationalID}</p>
          </div>

          {booking.observations && (
            <div className="flex items-start gap-2 text-sm">
              <MessageSquareText className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Observations</p>
                <p className="text-gray-600">{booking.observations}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-gray-500" />
            <p>
              Breakfast included?{" "}
              <span className="font-medium">
                {booking.hasBreakfast ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-md text-sm ${
              booking.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <div>
                <p className="font-medium">
                  Total price: ${booking.totalPrice.toFixed(2)}
                </p>
                {booking.hasBreakfast && (
                  <p className="text-xs text-gray-600">
                    (${booking.cabinPrice.toFixed(2)} cabin + $
                    {booking.extrasPrice.toFixed(2)} breakfast)
                  </p>
                )}
              </div>
            </div>
            <p className="uppercase font-semibold">
              {booking.isPaid ? "Paid" : "Will pay at property"}
            </p>
          </div>

          <p className="text-xs text-gray-500 text-right">
            Booked {new Date(booking.created_at).toLocaleString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
