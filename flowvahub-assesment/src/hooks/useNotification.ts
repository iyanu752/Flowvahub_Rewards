import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data && !error) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.is_read).length);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const loadNotifications = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data && isMounted) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.is_read).length);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId);

      await fetchNotifications();
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    if (!userId) return;
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);
      await fetchNotifications();
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark as read", error);
      toast.error("Failed to mark notifications as read");
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await supabase.from("notifications").delete().eq("id", notificationId);

      await fetchNotifications();
      toast.success("Sucessfully notification deleted");
    } catch (error) {
        console.error('Failed to delete notification', error)
        toast.error('Failed to delete notification')
    }
  };

  const deleteAll = async () => {
    if (!userId) return;
    try {
      await supabase.from("notifications").delete().eq("user_id", userId);

      await fetchNotifications();
      toast.success("All notifications deleted");
    } catch (error) {
      console.error("failed to delete notifications", error);
      toast.error("Failed to delete notifications");
    }
  };

  const createNotification = async (
    title: string,
    message: string,
    type: string
  ) => {
    if (!userId) return;

    await supabase.from("notifications").insert({
      user_id: userId,
      title,
      message,
      type,
    });

    await fetchNotifications();
  };

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
    createNotification,
    refresh: fetchNotifications,
  };
};
