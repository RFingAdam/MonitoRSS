import {
  Alert,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../constants";
import { LogoutButton } from "../../features/auth";

import { useDiscordBot, useDiscordUserMe } from "../../features/discordUser";
import { Loading } from "../Loading";
import { AddUserFeedDialog } from "../../features/feed";

interface Props {
  invertBackground?: boolean;
}

export const NewHeader = ({ invertBackground }: Props) => {
  const { data: discordBotData, status, error } = useDiscordBot();
  const { data: userMe } = useDiscordUserMe();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      width="100%"
      background={invertBackground ? "gray.700" : "none"}
      display="flex"
      justifyContent="center"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        maxWidth="1400px"
        paddingX={{ base: 4, lg: 12 }}
      >
        <HStack overflow="hidden" gap={4}>
          <Flex alignItems="center" overflow="hidden">
            {discordBotData && (
              <Flex alignItems="center" paddingBottom="1" overflow="hidden">
                <Avatar
                  src={discordBotData.result.avatar || undefined}
                  size="sm"
                  // name=
                  name={discordBotData.result.username}
                  marginRight="2"
                  backgroundColor="transparent"
                />
                <Heading
                  fontSize="xl"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  title="MonitoRSS"
                  // title={discordBotData.result.username}
                >
                  MonitoRSS
                  {/* {discordBotData.result.username} */}
                </Heading>
              </Flex>
            )}
            {status === "loading" && (
              <Box>
                <Loading />
              </Box>
            )}
            {error && <Alert status="error">{error.message}</Alert>}
          </Flex>
          <HStack>
            <Button
              variant="ghost"
              colorScheme={pathname === pages.userFeeds() ? "blue" : undefined}
              onClick={() => navigate(pages.userFeeds())}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              colorScheme={pathname === pages.userFeedsFaq() ? "blue" : undefined}
              onClick={() => navigate(pages.userFeedsFaq())}
            >
              FAQ
            </Button>
            <AddUserFeedDialog />
          </HStack>
        </HStack>
        <Flex alignItems="center" paddingY="4">
          <Menu placement="bottom-end">
            <MenuButton as={Button} size="sm" variant="link">
              <Avatar
                src={userMe?.iconUrl}
                size="sm"
                name={userMe?.username}
                backgroundColor="transparent"
                title={userMe?.username}
              />
            </MenuButton>
            <MenuList>
              <LogoutButton trigger={<MenuItem>{t("components.pageContentV2.logout")}</MenuItem>} />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
