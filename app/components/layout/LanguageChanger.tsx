import { useSearchParams } from "@remix-run/react";
import type * as React from "react";
import { useTranslation } from "react-i18next";
import { languages } from "~/modules/i18n/config";
import { LinkButton } from "../Button";
import { Popover } from "../Popover";
import { GlobeIcon } from "../icons/Globe";

const addUniqueParam = (
	oldParams: URLSearchParams,
	name: string,
	value: string,
): URLSearchParams => {
	const paramsCopy = new URLSearchParams(oldParams);
	paramsCopy.delete(name);
	paramsCopy.append(name, value);
	return paramsCopy;
};

export function LanguageChanger({
	children,
	plain = false,
}: {
	children?: React.ReactNode;
	plain?: boolean;
}) {
	const { t, i18n } = useTranslation();
	const [searchParams] = useSearchParams();

	return (
		<Popover
			buttonChildren={
				children ?? (
					<GlobeIcon
						alt={t("header.language")}
						className="layout__header__button__icon"
					/>
				)
			}
			triggerClassName={plain ? undefined : "layout__header__button"}
		>
			<div className="layout__user-popover">
				{languages.map((lang) => (
					<LinkButton
						key={lang.code}
						size="tiny"
						variant="minimal"
						className={
							i18n.language !== lang.code ? "text-main-forced" : undefined
						}
						to={`?${addUniqueParam(searchParams, "lng", lang.code).toString()}`}
					>
						{lang.name}
					</LinkButton>
				))}
			</div>
		</Popover>
	);
}
