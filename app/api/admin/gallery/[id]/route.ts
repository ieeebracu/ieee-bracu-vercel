import { auth } from "@/lib/auth";
import { deleteGalleryPhoto, getGalleryPhotoById } from "@/lib/gallery/queries";
import { deleteMedia } from "@/lib/storage/r2";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, context: RouteParams) {
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { id } = await context.params;

  if (!id) {
    const segments = new URL(request.url).pathname.split("/");
    id = segments[segments.length - 1] ?? "";
  }

  if (!id) {
    return Response.json({ error: "Missing photo id" }, { status: 400 });
  }

  const photo = await getGalleryPhotoById(id);
  if (!photo) {
    return Response.json({ error: "Photo not found" }, { status: 404 });
  }

  // 1. Delete image from R2
  try {
    if (photo.imageKey) {
      await deleteMedia(photo.imageKey);
    }
  } catch (error) {
    console.warn("Could not delete object from R2:", error);
  }

  // 2. Delete record from D1
  await deleteGalleryPhoto(id);

  return Response.json({ success: true, id });
}
