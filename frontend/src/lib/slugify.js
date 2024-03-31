export default function slugify(string) {
  return string?.replaceAll(" ", "_").toLowerCase();
}
