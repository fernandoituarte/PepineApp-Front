"use client";
import {
  Pagination,
  Spinner,
  NotFoundResult,
  ErrorComponent,
} from "@/components";
import { UserItem } from "./UserItem";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllUsers } from "@/store/reducer/user/user";
import { useEffect } from "react";

/**
 * The `Users` component displays a paginated list of users, retrieving data from the Redux store.
 *
 * Props:
 * - `limit`: Maximum number of users per page.
 * - `offset`: Starting point for user fetching.
 *
 * Features:
 * - Fetches user data based on `limit` and `offset`.
 * - Handles unauthorized access and redirects to a 404 page if no users are found.
 * - Renders a table with user details using the `UserItem` component.
 * - Includes pagination navigation with the `Pagination` component.
 *
 * State Management:
 * - `users`: List of users and pagination info from the store.
 * - `error`: Captures errors during the fetching process.
 */

export function Users({ limit, offset }) {
  const dispatch = useAppDispatch();
  const { users, error, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers({ limit, offset }));
  }, [dispatch, limit, offset]);

  if (loading) {
    return (
      <div className="sm:w-4/5 md:w-2/3 xl:w-1/2 mx-auto mt-8 p-6">
        <Spinner />
      </div>
    );
  }
  if (error === 401 || error === 403) {
    return (
      <ErrorComponent
        text={`Vous n'avez pas des droits pour acceder a ce contenu`}
      />
    );
  }

  if (users && users.totalUsers === 0) {
    return <NotFoundResult text={`Aucun utilisateur n'a été trouvé`} />;
  }

  return (
    <>
      <div className="mt-12 flow-root w-full m-auto">
        <div className="px-5 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" min-w-full pb-10 align-middle sm:px-6 lg:px-10">
            <div className="relative lg:m-auto ">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Téléphone
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Client depuis le
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Map over the array of users and render a UserItem for each user. */}
                  {users?.users &&
                    users?.users.map((user) => (
                      <UserItem key={user.email} {...user} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        totalPages={users?.totalPages}
        limit={limit}
        baseUrl={"/admin/users"}
      />
    </>
  );
}
