import Place from "@mui/icons-material/Place";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {Card, Image, CardBody} from "@nextui-org/react";

import type { PropertyCardProps } from "@/interfaces/property";

const PropertyCard = ({
  id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    <Card
    isFooterBlurred
    radius="lg"
    className="border-none"
      to={`/properties/show/${id}`}
      style={{
        maxWidth: "330px",
        padding: "10px",
        cursor: "pointer",
      }}
      elevation={0}
    >
      <Image
        width="100%"
        height={210}
        src={photo}
        alt="card image"
        radius="lg"
      />
      <CardBody className="flex flex-row justify-between gap-2.5 p-1.5">
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor="#dadefa"
          height="fit-content"
        >
          <Typography fontSize={12} fontWeight={600} color="#475be8">
            ${price}
          </Typography>
        </Box>
      </CardBody>
    </Card>
  );
};

export default PropertyCard;
