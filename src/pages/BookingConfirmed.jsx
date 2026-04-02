// @ts-nocheck
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowLeft, Calendar, Clock, Scissors } from "lucide-react";
import { motion } from "framer-motion";

export default function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  // Redirect if landed here without booking data
  useEffect(() => {
    if (!booking) {
      navigate("/book", { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const firstName = booking.client_name?.split(" ")[0] || "";
  const whatsappMsg =
    `Hi Bloom Skills & Beauty! 🌸 I've just booked online.\n\n` +
    `👤 Name: ${booking.client_name}\n` +
    `💅 Service: ${booking.service_detail}\n` +
    `📅 Date: ${booking.preferred_date}\n` +
    `⏰ Time: ${booking.preferred_time}\n` +
    `💰 Total: R${booking.price}\n\n` +
    `Please find my R100 proof of payment attached. 💳`;
  const whatsappUrl = `https://wa.me/27798060310?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="py-16 px-4 sm:px-6 min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Success Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 border-4 border-green-100 mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            You're booked, {firstName}! 🌸
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            We've received your booking and will confirm shortly via WhatsApp.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-card rounded-3xl border border-border/50 shadow-lg overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-primary to-primary/70 px-6 py-4">
            <p className="text-primary-foreground text-xs font-semibold uppercase tracking-widest">Booking Summary</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p className="text-sm font-semibold text-foreground">{booking.service_detail}</p>
                <p className="text-xs text-muted-foreground">{booking.service_category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-semibold text-foreground">{booking.preferred_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-sm font-semibold text-foreground">{booking.preferred_time}</p>
              </div>
            </div>
            {booking.price > 0 && (
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="font-heading text-2xl font-black text-primary">R{booking.price}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Notice */}
        {booking.price > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4"
          >
            <p className="font-semibold text-amber-800 mb-2">💳 Secure Your Slot — Pay R100 Now</p>
            <p className="text-sm text-amber-700 mb-1">
              Deposit <strong>R100</strong> to FNB account <strong className="tracking-wider">631 935 53469</strong>
            </p>
            <p className="text-sm text-amber-700 mb-1">Reference: <strong>{booking.client_name}</strong></p>
            <p className="text-xs text-amber-600 mt-2">This R100 forms part of your total of R{booking.price}. Send your proof of payment via WhatsApp below.</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full rounded-2xl h-12 bg-green-500 hover:bg-green-600 text-white text-base font-semibold shadow-lg shadow-green-200">
              <MessageCircle className="w-5 h-5 mr-2" />
              Send Proof of Payment on WhatsApp
            </Button>
          </a>
          <Link to="/book">
            <Button variant="outline" className="w-full rounded-2xl h-11">
              Book Another Appointment
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full rounded-2xl h-11 text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          📍 Sangro House, Durban · 079 806 0310 · Hours: 08:00–16:00
        </p>
      </motion.div>
    </div>
  );
}
