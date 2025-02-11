"use client";

import {
  UsersIcon,
  BriefcaseIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import GetMyTeam from "@/api/team/GetMyTeam";
import GetMyTeamMembers from "@/api/team/GetMyTeamMembers";
import { useApplication } from "@/store/useApplication";
import { TeamMember, TeamWithManagerDetails } from "@/types/team";
import Link from "next/link";

export default function TeamPage() {
  const { user } = useApplication();
  const [team, setTeam] = useState<TeamWithManagerDetails | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (user?.token) {
        try {
          const getTeam = new GetMyTeam(user.token);
          const getMembers = new GetMyTeamMembers(user.token);

          const [teamData, membersData] = await Promise.all([
            getTeam.execute(),
            getMembers.execute(),
          ]);

          setTeam(teamData);
          setTeamMembers(membersData);
        } catch (error) {
          console.error("Error fetching team data:", error);
          alert("error")
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTeamData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>No team found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">A propos de votre équipe</h1>
        {user?.role === "Manager" && (
          <Link 
            href="/my-team/team-leaves"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voir les congés de l'équipe
          </Link>
        )}
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <HomeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Nom de l'équipe
              </p>
              <p className="text-2xl font-semibold">{team.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Spécialité</p>
              <p className="text-2xl font-semibold">{team.specialty}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Membres d'équipe
              </p>
              <p className="text-2xl font-semibold">{teamMembers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Details */}
      {user?.role !== "Manager" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-700">Manager d'équipe</p>
              <p>
                {team.managerFirstName} {team.managerLastName}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          {member.picture ? (
                            <img
                              src={new URL(
                                member.picture,
                                process.env.NEXT_PUBLIC_IMAGE_URI
                              ).toString()}
                              alt="avatar"
                              className="w-full rounded-full"
                            />
                          ) : (
                            <span className="text-blue-700 font-medium">
                              {member.firstName.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.firstName} {member.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : member.status === "In Meeting"
                          ? "bg-yellow-100 text-yellow-800"
                          : member.status === "On Leave"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
