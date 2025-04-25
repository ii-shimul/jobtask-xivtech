import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import bitcoin from "./assets/bitcoin.png";
import etherium from "./assets/etherium.png";
import solana from "./assets/solana.png";
import tether from "./assets/tether.png";
import xrp from "./assets/xrp.png";

// Sample Data
const initialAssets = [
	{
		id: 1,
		logo: bitcoin,
		name: "Bitcoin",
		symbol: "BTC",
		price: 93759.48,
		change1h: 0.43,
		change24h: 0.93,
		change7d: 11.11,
		marketCap: 1861618902186,
		volume24h: 43874950947,
		supply: "19.85M BTC",
		chart: "📈",
	},
	{
		id: 2,
		logo: etherium,
		name: "Ethereum",
		symbol: "ETH",
		price: 1802.46,
		change1h: 0.6,
		change24h: 3.21,
		change7d: 13.68,
		marketCap: 217581279327,
		volume24h: 23547469307,
		supply: "120.71M ETH",
		chart: "📈",
	},
	{
		id: 3,
		logo: tether,
		name: "Tether",
		symbol: "USDT",
		price: 1.0,
		change1h: 0.0,
		change24h: 0.0,
		change7d: 0.04,
		marketCap: 145320022085,
		volume24h: 92288882007,
		supply: "145.27B USDT",
		chart: "📉",
	},
	{
		id: 4,
		logo: xrp,
		name: "XRP",
		symbol: "XRP",
		price: 2.22,
		change1h: 0.46,
		change24h: 0.54,
		change7d: 6.18,
		marketCap: 130073814966,
		volume24h: 5131481491,
		supply: "58.39B XRP",
		chart: "📈",
	},
	{
		id: 5,
		logo: solana,
		name: "Solana",
		symbol: "SOL",
		price: 151.51,
		change1h: 0.53,
		change24h: 1.26,
		change7d: 14.74,
		marketCap: 78381958631,
		volume24h: 4881674486,
		supply: "517.31M SOL",
		chart: "📈",
	},
];

// Redux Slice
const assetSlice = createSlice({
	name: "assets",
	initialState: initialAssets,
	reducers: {
		updatePrices: (state) => {
			return state.map((asset) => {
				const priceChange = 1 + (Math.random() * 0.02 - 0.01);
				const newPrice = parseFloat((asset.price * priceChange).toFixed(2));
				return {
					...asset,
					price: newPrice,
					change1h: parseFloat((Math.random() * 2 - 1).toFixed(2)),
					change24h: parseFloat((Math.random() * 2 - 1).toFixed(2)),
					volume24h: Math.floor(
						asset.volume24h * (1 + (Math.random() * 0.1 - 0.05))
					),
				};
			});
		},
	},
});

const store = configureStore({ reducer: { assets: assetSlice.reducer } });
const { updatePrices } = assetSlice.actions;

// Helper for colored % changes
const formatChange = (value) => (
	<span className={value >= 0 ? "text-green-500" : "text-red-500"}>
		{value}%
	</span>
);

// Table Component
const CryptoTable = () => {
	const assets = useSelector((state) => state.assets);
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(updatePrices());
		}, 1500);
		return () => clearInterval(interval);
	}, [dispatch]);

	return (
		<div className="overflow-x-auto p-4 max-w-7xl mx-auto">
			<table className="table table-zebra w-full">
				<thead>
					<tr>
						<th>#</th>
						<th>Logo</th>
						<th>Name</th>
						<th>Symbol</th>
						<th>Price</th>
						<th>1h %</th>
						<th>24h %</th>
						<th>7d %</th>
						<th>Market Cap</th>
						<th>24h Volume</th>
						<th>Circulating Supply</th>
						<th>7D Chart</th>
					</tr>
				</thead>
				<tbody>
					{assets.map((asset, index) => (
						<tr key={asset.id}>
							<td>{index + 1}</td>
							<td>
								<img src={asset.logo} alt={asset.symbol} className="w-6 h-6" />
							</td>
							<td>{asset.name}</td>
							<td>{asset.symbol}</td>
							<td>${asset.price.toLocaleString()}</td>
							<td>{formatChange(asset.change1h)}</td>
							<td>{formatChange(asset.change24h)}</td>
							<td>{formatChange(asset.change7d)}</td>
							<td>${asset.marketCap.toLocaleString()}</td>
							<td>${asset.volume24h.toLocaleString()}</td>
							<td>{asset.supply}</td>
							<td>{asset.chart}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

// App Component
const App = () => (
	<Provider store={store}>
		<div className="min-h-screen bg-base-200">
			<h1 className="text-4xl font-bold text-center p-4">
				📊 Crypto Price Tracker
			</h1>
			<CryptoTable />
		</div>
	</Provider>
);

export default App;
