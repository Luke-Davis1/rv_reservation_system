import { DashboardContainer } from "../components/DashboardContainer";
import { AddEmployeeDashboard } from "../dashboards/AddEmployeeDashboard";
import { AdminDashboard } from "../dashboards/AdminDashboard";
import { AdminManageRolesDashboard } from "../dashboards/AdminManageRolesDashboard";
import { AdminUpdatePasswordDashboard } from "../dashboards/AdminUpdatePasswordDashboard";
import { AvailableReservationsDashboard } from "../dashboards/AvailableReservationsDashboard";
import { BookReservationDashboard } from "../dashboards/BookReservationDashboard";
import { ContactDashboard } from "../dashboards/ContactDashboard";
import { CreateCustomerDashboard } from "../dashboards/CreateCustomerDashboard";
import { CustomerFilterSlotsDashboard } from "../dashboards/CustomerFilterSlotsDashboard";
import { ElementShowcase } from "../dashboards/ElementShowcase";
import { EmployeeBookedReservationDetailsDashboard } from "../dashboards/EmployeeBookedReservationDetailsDashboard";
import { EmployeeBookedReservationsDashboard } from "../dashboards/EmployeeBookedReservationsDashboard";
import { EmployeeBookReservationDashboard } from "../dashboards/EmployeeBookReservationDashboard";
import { EmployeeDashboard } from "../dashboards/EmployeeDashboard";
import { Home } from "../dashboards/Home";
import { LoginDashboard } from "../dashboards/LoginDashboard";
import { MyReservationsDashboard } from "../dashboards/MyReservationsDashboard";
import { ProfileInfoDashboard } from "../dashboards/ProfileInfoDashboard";
import { ReservationPaymentDashboard } from "../dashboards/ReservationPaymentDashboard";
import { UpdateRoleDashboard } from "../dashboards/UpdateRoleDashboard";
import { UserUpdatePasswordDashboard } from "../dashboards/UserUpdatePasswordDashboard";

export const routeMap = [
  {
    path: '/',
    element: <DashboardContainer dashboard={<Home />} $width={'100%'} hideUser headerPosition={"absolute"} />
  },
  {
    path: '/showcase',
    element: <ElementShowcase />
  },
  {
    path: '/reservations',
    element: <DashboardContainer dashboard={<MyReservationsDashboard />} title="My Reservations" />
  },
  {
    path: '/book',
    element: <DashboardContainer dashboard={<BookReservationDashboard />} title="Book Reservation" />
  },
  {
    path: '/book/payment',
    element: <DashboardContainer dashboard={<ReservationPaymentDashboard />} title="Book Reservation" />
  },
  {
    path: '/employee/reservations/available',
    element: <DashboardContainer dashboard={<AvailableReservationsDashboard />} title="Available Reservations" />
  },
  {
    path: '/employee/reservations',
    element: <DashboardContainer dashboard={<EmployeeBookedReservationsDashboard />} title="Booked Reservations" />
  },
  {
    path: '/employee/reservation/details',
    element: <DashboardContainer dashboard={<EmployeeBookedReservationDetailsDashboard />} title="Booked Reservations" />
  },
  {
    path: '/employee/reservations/book',
    element: <DashboardContainer dashboard={<EmployeeBookReservationDashboard />} title="Book Reservation" />
  },
  {
    path: '/admin',
    element: <DashboardContainer dashboard={<AdminDashboard />} title="Dashboard" />
  },
  {
    path: '/login',
    element: <DashboardContainer dashboard={<LoginDashboard />} title="" />
  },
  {
    path: '/register',
    element: <DashboardContainer dashboard={<CreateCustomerDashboard />} title="" />
  },
  {
    path: '/admin/updatepasswords',
    element: <DashboardContainer dashboard={<AdminUpdatePasswordDashboard />} title="Update Passwords" />
  },
  {
    path: '/updatepassword',
    element: <DashboardContainer dashboard={<UserUpdatePasswordDashboard />} title="Change Password" />
  },
  {
    path: '/admin/updaterole',
    element: <DashboardContainer dashboard={<UpdateRoleDashboard />} title="Manage Roles" />
  },
  {
    path: '/customer/filterslots',
    element: <DashboardContainer dashboard={<CustomerFilterSlotsDashboard />} title="Book Reservation" />
  },
  {
    path: '/admin/addemployee',
    element: <DashboardContainer dashboard={<AddEmployeeDashboard />} title="Add Employee" />
  },
  {
    path: '/employee',
    element: <DashboardContainer dashboard={<EmployeeDashboard />} title="Dashboard" />
  },
  {
    path: '/profile',
    element: <DashboardContainer dashboard={<ProfileInfoDashboard />} title="Profile" />
  },
  {
    path: '/admin/manageroles',
    element: <DashboardContainer dashboard={<AdminManageRolesDashboard />} title="Manage Roles" />
  },
  {
    path: '/contact',
    element: <DashboardContainer dashboard={<ContactDashboard />} title="Contact" />
  }
]