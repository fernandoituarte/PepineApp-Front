import { Title, Users } from "@/components";

export const metadata = {
  title: "Utilisateurs",
  description: "Gerez vos utilisateurs",
};

export default function Page() {
  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <Title title={metadata.title} className={"text-center"} />
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
                <Users />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
