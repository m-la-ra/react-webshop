function sanitizeItemName(brand, name) {
  if (!brand || !name) return name || "";

  brand.trim();
  name.trim();

  const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escapedBrand}\\b`, "i");

  if (regex.test(name)) {
    name = name
      .replace(regex, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  const sanitizedName = `${brand} ${name}`;

  return sanitizedName
}

export default sanitizeItemName;
