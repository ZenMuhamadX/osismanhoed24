import { Lock, TimerIcon, UserCogIcon, UserSquareIcon } from "lucide-react";
import { AccountMenuItem } from "../../types";

export const menuItems: AccountMenuItem[] = [
  {
    icon: Lock,
    title: 'Ganti Password',
    description: 'Ubah kata sandi akun Anda',
    route: '/dashboard/account/change_password',
  },
  {
    icon: UserCogIcon,
    title: 'Ganti display name',
    description: 'Ubah display name anda',
    route: '/dashboard/account/change_display_name',
  },
  {
    icon: UserSquareIcon,
    title: 'Avatar',
    description: 'Ubah avatar anda',
    route: '/dashboard/account/avatars',
  },
  {
    icon: TimerIcon,
    title: 'Terakhir login',
    description: 'Lihat waktu terakhir login Anda',
    route: '/dashboard/account/last_login',
  },
]
