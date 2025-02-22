import MediaGrid from "@/components/grid/static";
import Pagination from "@/components/pagination";
import { getGenre, getGenreList } from "@/lib/api";
import { DEFAULT_METADATA } from "@/lib/constants";
import { Metadata } from "next";

type Props = {
  params: { id: number, type: MediaType};
  searchParams: {page: string}
};

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata> {

    const genre = await getGenreList(params.type);
      const type =
        params.type === "movie" ? "Movies" : "Tv";
    const name = genre.genres.find((g) => g.id == params.id)?.name;
    const url = searchParams
      ? `/${params.type}/genre/${params.id}?page=${searchParams.page}`
      : `/${params.type}/genre/${params.id}`;

  return {
    title: `${name} ${type}`,
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title: `${name} ${type} | ${DEFAULT_METADATA.title}`
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: `${name} ${type} | ${DEFAULT_METADATA.openGraph.title}`,
      url: url,
    },
  };
}

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = "edge";
export default async function QueryPage({
  params,
  searchParams,
}: {
  params: { id: number; type: MediaType };
  searchParams: { page: string };
}) {
  const genre = await getGenreList(params.type);
  const data = await getGenre(params.type, params.id, searchParams.page);
  const name = genre.genres.find((g) => g.id == params.id)?.name;

  return (
    <main className="my-global">
      <h1 className="text-2xl px-global mb-5">
        {name} {params.type === "tv" ? "TV Shows" : "Movies"}
      </h1>
      <MediaGrid items={data.results} />
      <Pagination page={searchParams.page} totalPages={data.total_pages} />
    </main>
  );
}
